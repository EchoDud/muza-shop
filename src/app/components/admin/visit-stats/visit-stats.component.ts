import { Component, OnInit } from '@angular/core';
import { VisitStatsService } from '../../../shared/services/visit-stats.service';
import { MatTableDataSource } from '@angular/material/table';
import { Chart, registerables } from 'chart.js';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-visit-statistics',
  standalone: true,
  templateUrl: './visit-stats.component.html',
  styleUrls: ['./visit-stats.component.css'],
  imports: [MatTableModule,CommonModule],
})
export class VisitStatisticsComponent implements OnInit {

  displayedColumns: string[] = ['month', 'visitsCount'];
  dataSource = new MatTableDataSource<any>([]);

  public chart: any;
  public chartData: number[] = [];
  public chartLabels: string[] = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  public chartOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };

  constructor(private visitStatsService: VisitStatsService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    this.visitStatsService.getStats().subscribe((data) => {
      // Заполняем данные для таблицы
      this.dataSource.data = data;

      // Формируем данные для графика, учитывая месяц
      const currentYear = new Date().getFullYear();
      this.chartLabels = this.chartLabels.map((month, index) => `${month} ${currentYear}`);

      this.chartData = new Array(12).fill(0);  // Массив для всех месяцев, инициализируем нулями
      data.forEach(item => {
        const monthIndex = new Date(item.month).getMonth();  // Получаем индекс месяца
        this.chartData[monthIndex] = item.visitsCount;
      });

      // Прогнозируем данные для следующих двух месяцев
      this.predictNextMonths();
      this.createChart();
    }, error => {
      console.error('Ошибка при загрузке данных статистики:', error);
    });
  }

  // Метод для прогнозирования данных для следующих двух месяцев
  predictNextMonths() {
    const predictedData = [...this.chartData];

    // Используем метод скользящего среднего или простой прогноз
    const lastValue = predictedData[predictedData.length - 1];
    const secondLastValue = predictedData[predictedData.length - 2];
    const nextValue = (lastValue + secondLastValue) / 2; // Простое усреднение для прогноза
    predictedData.push(nextValue);  // Прогнозируем следующий месяц

    // То же самое для второго месяца вперед
    const newValue = (nextValue + lastValue) / 2;
    predictedData.push(newValue);  // Прогнозируем второй следующий месяц

    // Обновляем данные для графика
    this.chartData = predictedData;
    this.chartLabels.push('Январь ' + (new Date().getFullYear() + 1)); // Добавляем Январь следующего года
    this.chartLabels.push('Февраль ' + (new Date().getFullYear() + 1)); // Добавляем Февраль следующего года
  }

  createChart() {
    this.chart = new Chart('visitChart', {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [{
          label: 'Посещения',
          data: this.chartData,
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1
        }]
      },
      options: this.chartOptions
    });
  }
}
