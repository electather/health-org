import ApexCharts from 'apexcharts';
import { ipcRenderer } from 'electron';

class Charts {
  constructor() {
    this.firstChart = document.querySelector('#chartjs-first');
    this.secondChart = document.querySelector('#chartjs-second');
    this.IHeatMap = document.querySelector('#chartjs-iheatmap');
    this.SHeatMap = document.querySelector('#chartjs-sheatmap');
  }

  init(data) {
    let firstChartOpts = {
      chart: {
        height: 350,
        type: 'line',
        shadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 1
        },
        toolbar: {
          show: true
        }
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: 'smooth'
      },
      series: [
        {
          name: 'I',
          data: data.iArray
        }
      ],
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      markers: {
        size: 6
      },
      xaxis: {
        categories: data.timeArray,
        title: {
          text: 'time'
        }
      },
      yaxis: {
        title: {
          text: 'I'
        },
        min: 0
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true
      }
    };
    let secondChartOpts = {
      chart: {
        height: 350,
        type: 'line',
        shadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 1
        },
        toolbar: {
          show: true
        }
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: 'smooth'
      },
      series: [
        {
          name: 'S',
          data: data.sArray
        }
      ],
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      markers: {
        size: 6
      },
      xaxis: {
        categories: data.timeArray,
        title: {
          text: 'time'
        }
      },
      yaxis: {
        title: {
          text: 'S'
        },
        min: 0
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true
      }
    };

    const IheatMapOpts = {
      chart: {
        height: 350,
        type: 'heatmap'
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#DC3023', '#FFB61E'],
      series: [
        {
          name: 'I',
          data: data.heatMap.IheatMapObj
        }
      ]
    };
    const SheatMapOpts = {
      chart: {
        height: 350,
        type: 'heatmap'
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#FFB61E'],
      series: [
        {
          name: 'S',
          data: data.heatMap.SheatMapObj
        }
      ]
    };

    const firstChart = new ApexCharts(this.firstChart, firstChartOpts);
    const secondChart = new ApexCharts(this.secondChart, secondChartOpts);
    const IHeatMap = new ApexCharts(this.IHeatMap, IheatMapOpts);
    const SHeatMap = new ApexCharts(this.SHeatMap, SheatMapOpts);
    firstChart.render();
    secondChart.render();
    IHeatMap.render();
    SHeatMap.render();
  }
}

ipcRenderer.on('chartData:send', (_event, data) => {
  console.log(data);
  jQuery(() => {
    new Charts().init(data);
  });
});

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
