import translation from "../../../i18n/translate"


export const WorksOptions = {
    indexAxis: 'y' ,
    plugins: {
      title: {
        display: true,
      },
      legend: {
        position: 'right' ,
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: {
            drawOnChartArea: false,
        },
      },
      y: {
        stacked: true,
      },
    },
  };

 //options for agency chart
 export const chartOptions = {
      responsive: true,
      plugins: [
          {
              legend: {
                  display: true,
                  position: 'right',
                  align: 'start',
                  labels: {
                      boxHeight: 2,
                      boxWidth: 2,
                  },
              },
              title: {
                  // display: true,
                  text: translation('agencies'),
                  fontSize: 25,
              },
              beforeInit: (chart, options) => {
                  chart.legend.afterFit = () => {
                      if (chart.legend.margins) {
                          // Put some padding around the legend/labels
                          chart.legend.options.labels.padding = 20;
                          // Because you added 20px of padding around the whole legend,
                          // you will need to increase the height of the chart to fit it
                          chart.height += 40;
                      }
                  };
              },
          },
      ],
      scales: {
          x: {
              grid: {
                  drawOnChartArea: false,
              },
          },
          y: {
              grid: {
                  drawOnChartArea: true,
              },
          },
      },
  };
//session in week table
 export const sesColumn = [
    // {
    //     label: '',
    //     field: 'sessDate',
    //     sort: 'asc',
    // },
    {
        label: '',
        field: 'fileNum',
        sort: 'asc',
    },
    {
        label: '',
        field: 'stgNum',
        sort: 'asc',
    },
    {
        label: '',
        field: 'stgType',
        sort: 'asc',
    },
    {
        label: '',
        field: 'courtName',
        sort: 'asc',
    },
    {
        label: '',
        field: 'agents',
        sort: 'asc',
    },
    {
        label: '',
        field: 'ants',
        sort: 'asc',
    },
    {
        label: '',
        field: 'lastSesDate',
        sort: 'asc',
    },
    {
        label: '',
        field: 'lastSesDetails',
        sort: 'asc',
    },
    // {
    //     label: '',
    //     field: 'notes',
    //     sort: 'asc',
    // },
    {
        label: '',
        field: 'adjSes',
        sort: 'asc',
    }
];

//filter agenct as per type
export const filterAgency = (data) =>
data?.reduce((acc, curr) => {
    acc[curr?.AGE_TYPE_NAME] = acc[curr?.AGE_TYPE_NAME] || {
        name: curr?.AGE_TYPE_NAME,
        data: [],
    };
    acc[curr?.AGE_TYPE_NAME].data.push({ curr });
    return acc;
}, {});