class pageFormsValidation {
  static initValidation() {
    One.helpers('validation');

    jQuery('#spread-cal-form').validate({
      ignore: [],
      rules: {
        city_name: {
          required: true
        },
        infection_name: {
          required: true
        },
        healing_rate: {
          required: true
        },
        infection_rate: {
          required: true
        },
        infected_population: {
          required: true
        },
        sim_time: {
          required: true
        }
      },
      messages: {
        city_name: 'لطفا یک شهر را انتخاب نمایید!',
        infection_name: 'لطفا یک بیماری را انتخاب نمایید!',
        healing_rate: 'لطفا یک مقدار وارد نمایید!',
        infection_rate: 'لطفا یک مقدار وارد نمایید!',
        infected_population: 'لطفا یک مقدار وارد نمایید!',
        sim_time: 'لطفا یک مقدار وارد نمایید!'
      }
    });
  }

  /*
   * Init functionality
   *
   */
  static init() {
    this.initValidation();
  }
}

// Initialize when page loads
jQuery(() => {
  pageFormsValidation.init();
});
