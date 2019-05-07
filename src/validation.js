class pageFormsValidation {
  static initValidation() {
    One.helpers('validation');

    jQuery('#spread-cal-form').validate({
      ignore: [],
      rules: {
        'city-name': {
          required: true
        },
        'infection-name': {
          required: true
        },
        'healing-rate': {
          required: true
        },
        'infection-rate': {
          required: true
        },
        'infected-population': {
          required: true
        },
        'sim-time': {
          required: true
        }
      },
      messages: {
        'city-name': 'لطفا یک شهر را انتخاب نمایید!',
        'infection-name': 'لطفا یک بیماری را انتخاب نمایید!',
        'healing-rate': 'لطفا یک مقدار وارد نمایید!',
        'infection-rate': 'لطفا یک مقدار وارد نمایید!',
        'infected-population': 'لطفا یک مقدار وارد نمایید!',
        'sim-time': 'لطفا یک مقدار وارد نمایید!'
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
