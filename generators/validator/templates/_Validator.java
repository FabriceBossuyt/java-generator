package <%= packageName %>.dto.validator;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import <%= packageName %>.dto.<%= validatorName %>Dto;
import <%= packageName %>.service.<%= validatorName %>Service;

@Component
public class <%= validatorName %>DtoValidator implements Validator {

  private static final Logger logger = LogManager.getLogger(<%= validatorName %>DtoValidator.class);
  private <%= validatorName %>Service <%= validatorName_cc %>Service;

  @Autowired
  public <%= validatorName %>DtoValidator(<%= validatorName %>Service <%= validatorName_cc %>Service) {
    this.<%= validatorName_cc %>Service = <%= validatorName_cc %>Service;
  }

  @Override
  public boolean supports(Class<?> clazz) {
    return <%= validatorName %>Dto.class.isAssignableFrom(clazz);
  }

  @Override
  public void validate(Object target, Errors errors) {
    <%= validatorName %>Dto dto = (<%= validatorName %>Dto)target;
  }

}
