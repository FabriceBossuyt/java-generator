package <%= packageName %>.controller.rest;

import java.util.List;
import <%= packageName %>.service.<%= controllerClass %>Service;
import <%= packageName %>.dto.<%= controllerClass %>Dto;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/<%= pathName %>")
public class <%= controllerClass %>RestController {

  private static final Logger logger = LogManager.getLogger(<%= controllerClass %>RestController.class);

  private <%= controllerClass %>Service <%= controllerClass_cc %>Service;

  @Autowired
  public <%= controllerClass %>RestController(<%= controllerClass %>Service <%= controllerClass_cc %>Service) {
    this.<%= controllerClass_cc %>Service = <%= controllerClass_cc %>Service;
  }

  @RequestMapping(value = "", method = RequestMethod.GET)
  public List<<%= controllerClass %>Dto> getAll() {
    logger.info("Return all <%= controllerClass_cc %>.");

    return <%= controllerClass_cc %>Service.getAll();
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  public <%= controllerClass %>Dto getById(@PathVariable("id") Long id) {
    logger.info("Return <%= controllerClass_cc %> with id");

    return <%= controllerClass_cc %>Service.getById(id);
  }

}
