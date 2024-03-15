export default  function VariantExtractor(optionChoosenValues:any,variantsDetails:any) {
    if (!variantsDetails) {
      return;
    }
    let currentVariantInfo: any = [];

    let choosenOptionsFullDetails: any = [];
    if (optionChoosenValues) {
      let getVariant = [];

      for (let i = 0; i < variantsDetails.length; i++) {
        let relativeOptions = variantsDetails[i].relativeOptions;
        let valid = true;
        let element = variantsDetails[i];
        for (let i = 0; i < optionChoosenValues.length; i++) {
          console.log(
            relativeOptions?.[i]?.property_value_id,
            "relativeOptions[i].property_value_id"
          );
          console.log(
            optionChoosenValues?.[i]?.property_id,
            "optionChoosenValues[i].property_id"
          );

          if (
            relativeOptions?.[i]?.property_value_id !=
            optionChoosenValues?.[i]?.property_id
          ) {
            valid = false;
          }
        }
        if (valid) {
          getVariant.push(element);
          break;
        }
      }
      console.log("getVariant", getVariant);
      return getVariant;


    }
  
  }