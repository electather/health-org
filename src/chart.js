const { ipcRenderer } = require('electron');

/*
 *  Document   : be_pages_dashboard.js
 *  Author     : pixelcave
 *  Description: Custom JS code used in Dashboard Page
 */

class pageDashboard {
  /*
   * Chart.js, for more examples you can check out http://www.chartjs.org/docs
   *
   */
  static initCharts(data) {
    // Set Global Chart.js configuration
    Chart.defaults.global.defaultFontColor = '#495057';
    Chart.defaults.scale.gridLines.color = 'transparent';
    Chart.defaults.scale.gridLines.zeroLineColor = 'transparent';
    Chart.defaults.scale.display = false;
    Chart.defaults.scale.ticks.beginAtZero = true;
    Chart.defaults.global.elements.line.borderWidth = 0;
    Chart.defaults.global.elements.point.radius = 0;
    Chart.defaults.global.elements.point.hoverRadius = 0;
    Chart.defaults.global.tooltips.cornerRadius = 3;
    Chart.defaults.global.legend.labels.boxWidth = 12;

    // Get Chart Containers
    let firstChart = jQuery('.chartjs-first');
    let secondChart = jQuery('.chartjs-second');

    // Set Chart Variables
    let chartEarnings,
      chartEarningsOptions,
      chartEarningsData,
      chartSales,
      chartSalesOptions,
      chartSalesData;

    // Earnigns Chart Options
    chartEarningsOptions = {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              suggestedMax: 3000
            }
          }
        ]
      },
      tooltips: {
        intersect: false,
        callbacks: {
          label: function(tooltipItems, data) {
            return ' $' + tooltipItems.yLabel;
          }
        }
      }
    };

    // Earnigns Chart Options
    chartSalesOptions = {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              suggestedMax: 260
            }
          }
        ]
      },
      tooltips: {
        intersect: false,
        callbacks: {
          label: function(tooltipItems, data) {
            return ' ' + tooltipItems.yLabel + ' Sales';
          }
        }
      }
    };

    // Earnings Chart Data
    chartEarningsData = {
      labels: data.timeArray,
      datasets: [
        {
          label: 'This Year',
          fill: true,
          backgroundColor: 'rgba(132, 94, 247, .3)',
          borderColor: 'transparent',
          pointBackgroundColor: 'rgba(132, 94, 247, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(132, 94, 247, 1)',
          data: data.iArray
        }
      ]
    };

    // Sales Chart Data
    chartSalesData = {
      labels: data.timeArray,
      datasets: [
        {
          label: 'This Year',
          fill: true,
          backgroundColor: 'rgba(34, 184, 207, .3)',
          borderColor: 'transparent',
          pointBackgroundColor: 'rgba(34, 184, 207, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(34, 184, 207, 1)',
          data: data.sArray
        }
      ]
    };

    // Init Earnings Chart
    if (firstChart.length) {
      chartEarnings = new Chart(firstChart, {
        type: 'line',
        data: chartEarningsData,
        options: chartEarningsOptions
      });
    }

    // Init Sales Chart
    if (secondChart.length) {
      chartSales = new Chart(secondChart, {
        type: 'line',
        data: chartSalesData,
        options: chartSalesOptions
      });
    }
  }

  /*
   * Init functionality
   *
   */
  static init(data) {
    this.initCharts(data);
  }
}

ipcRenderer.on('chartData:send', (_event, data) => {
  console.log(data);
  jQuery(() => {
    pageDashboard.init(data);
  });
});

//TABLE

class pageTablesDatatables {
  /*
   * Init DataTables functionality
   *
   */
  static initDataTables(data) {
    // Override a few default classes
    jQuery.extend(jQuery.fn.dataTable.ext.classes, {
      sWrapper: 'dataTables_wrapper dt-bootstrap4',
      sFilterInput: 'form-control form-control-sm',
      sLengthSelect: 'form-control form-control-sm'
    });

    // Override a few defaults
    jQuery.extend(true, jQuery.fn.dataTable.defaults, {
      language: {
        lengthMenu: '_MENU_',
        search: '_INPUT_',
        searchPlaceholder: 'جست و جو ...',
        info: 'صفحه  <strong>_PAGE_</strong> از <strong>_PAGES_</strong>',
        paginate: {
          first: '<i class="fa fa-angle-double-right"></i>',
          previous: '<i class="fa fa-angle-right"></i>',
          next: '<i class="fa fa-angle-left"></i>',
          last: '<i class="fa fa-angle-double-left"></i>'
        }
      }
    });

    // Init full DataTable
    const table = jQuery('.js-dataTable-full').dataTable({
      pageLength: 10,
      lengthMenu: [[5, 10, 15, 20], [5, 10, 15, 20]],
      autoWidth: false,
      data: data,
      columns: [
        { title: 'ردیف' },
        { title: 'تعداد افراد الوده' },
        { title: 'تعداد تخت' }
      ]
    });

    // Init full extra DataTable
    jQuery('.js-dataTable-full-pagination').dataTable({
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [[5, 10, 15, 20], [5, 10, 15, 20]],
      autoWidth: false
    });

    // Init simple DataTable
    jQuery('.js-dataTable-simple').dataTable({
      pageLength: 10,
      lengthMenu: false,
      searching: false,
      autoWidth: false,
      dom: "<'row'<'col-sm-12'tr>>" + "<'row'<'col-sm-6'i><'col-sm-6'p>>"
    });

    // Init DataTable with Buttons
    jQuery('.js-dataTable-buttons').dataTable({
      pageLength: 10,
      lengthMenu: [[5, 10, 15, 20], [5, 10, 15, 20]],
      autoWidth: false,
      buttons: [
        { extend: 'copy', className: 'btn btn-sm btn-primary' },
        { extend: 'csv', className: 'btn btn-sm btn-primary' },
        { extend: 'print', className: 'btn btn-sm btn-primary' }
      ],
      dom:
        "<'row'<'col-sm-12'<'text-center bg-body-light py-2 mb-2'B>>>" +
        "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>"
    });
  }

  /*
   * Init functionality
   *
   */
  static init(data) {
    this.initDataTables(data);
  }
}

ipcRenderer.on('tableData:send', (_event, data) => {
  jQuery(() => {
    pageTablesDatatables.init(data);
  });
});
