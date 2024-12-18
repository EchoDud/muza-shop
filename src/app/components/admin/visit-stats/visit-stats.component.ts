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
  
      // Отмечаем последние два месяца красным цветом для графика
      this.createChart();
    }, error => {
      console.error('Ошибка при загрузке данных статистики:', error);
    });
  }
  
  predictNextMonths() {
    const predictedData = [...this.chartData];
  
    // Используем метод скользящего среднего или простой прогноз
    const lastValue = predictedData[predictedData.length - 1];
    const secondLastValue = predictedData[predictedData.length - 2];
    const nextValue = Math.round((lastValue + secondLastValue) / 2); // Округляем до целого
    predictedData.push(nextValue);  // Прогнозируем следующий месяц
  
    // То же самое для второго месяца вперед
    const newValue = Math.round((nextValue + lastValue) / 2); // Округляем до целого
    predictedData.push(newValue);  // Прогнозируем второй следующий месяц
  
    // Обновляем данные для графика
    this.chartData = predictedData;
  
    // Добавляем метки для графика
    const currentYear = new Date().getFullYear();
    this.chartLabels.push(`Январь ${currentYear + 1}`);
    this.chartLabels.push(`Февраль ${currentYear + 1}`);
  
    // Формируем данные для таблицы
    const updatedData = [
      ...this.dataSource.data,
      { month: `01-${currentYear + 1}`, visitsCount: nextValue }, // Январь
      { month: `02-${currentYear + 1}`, visitsCount: newValue }  // Февраль
    ];
  
    // Обновляем таблицу
    this.dataSource.data = updatedData;
  }
  
  createChart() {
    // Очищаем старый график перед созданием нового
    if (this.chart) {
      this.chart.destroy();
    }
  
    // Определяем цвет точек
    const pointColors = this.chartData.map((_, index) => {
      if (index === this.chartData.length - 1 || index === this.chartData.length - 2) {
        return 'red'; // Красный для точек последних двух месяцев
      }
      return 'rgba(75, 192, 192, 1)'; // Стандартный цвет для точек
    });
  
    // Создаем сегменты с разными цветами для линий
    const borderColors = this.chartData.map((_, index) => {
      if (index === this.chartData.length - 1 || index === this.chartData.length - 2) {
        return 'red'; // Красный для последних двух месяцев
      }
      return 'rgba(75, 192, 192, 1)'; // Стандартный цвет для других месяцев
    });
  
    // Добавляем прогнозные данные
    const predictedData = this.chartData.slice();  // Создаем копию данных для прогноза
    predictedData.push(this.chartData[this.chartData.length - 1] * 1.1); // Пример прогноза для следующего месяца
    predictedData.push(this.chartData[this.chartData.length - 1] * 1.05); // Прогнозируем второй месяц
  
    this.chart = new Chart('visitChart', {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Посещения',
            data: this.chartData,
            fill: false,
            pointBackgroundColor: pointColors,  // Цвет точек
            borderColor: borderColors,  // Цвет линий
            tension: 0.1,
            segment: {
              borderColor: (context) => {
                const index = context.p0DataIndex;
                if (index === this.chartData.length - 2 || index === this.chartData.length - 1) {
                  return 'red'; // Красный для последних двух сегментов
                }
                return 'rgba(75, 192, 192, 1)'; // Стандартный цвет для остальных сегментов
              }
            }
          },
          {
            label: 'Прогноз',
            data: predictedData,
            fill: false,
            pointBackgroundColor: ['red', 'red'],  // Красный для точек прогноза
            borderColor: ['red', 'red'],  // Красный для линии прогноза
            tension: 0.1
          }
        ]
      },
      options: this.chartOptions
    });
  }
  
  isLastTwoMonths(month: string): boolean {
    const year = parseInt(month.split('-')[1], 10);
    const monthIndex = parseInt(month.split('-')[0], 10);
  
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
  
    // Проверяем, является ли текущий месяц или следующий
    if (
      (year === currentYear && (monthIndex === currentMonth || monthIndex === currentMonth + 1)) ||
      (year === currentYear + 1 && monthIndex <= 2)
    ) {
      return true;
    }
    return false;
  }
  
  
  
}
