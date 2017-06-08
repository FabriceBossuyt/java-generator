package <%= packageName %>.controller;

import java.util.List;

import javax.validation.Valid;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import <%= packageName %>.service.<%= controllerClass %>Service;
import <%= packageName %>.dto.<%= controllerClass %>Dto;

@Controller
@RequestMapping(value = "/<%= pathName %>")
public class <%= controllerClass %>Controller {

  private static final Logger logger = LogManager.getLogger(<%= controllerClass %>Controller.class);

  private <%= controllerClass %>Service <%= controllerClass_cc %>Service;

  @Autowired
  public <%= controllerClass %>Controller(<%= controllerClass %>Service <%= controllerClass_cc %>Service) {
    this.<%= controllerClass_cc %>Service = <%= controllerClass_cc %>Service;
  }

  @RequestMapping(value = "", method = RequestMethod.GET)
  public String getAll(Model model,
      @RequestParam(defaultValue = "1", value = "page", required = false) Integer page,
      @RequestParam(defaultValue = "10", value = "size", required = false) Integer size) {

    return null;
  }

  @RequestMapping(value = "/add", method = RequestMethod.GET)
  public String add(Model model) {
    return null;
  }

  @RequestMapping(value = "/edit/{id}", method = RequestMethod.GET)
  public String edit(@PathVariable("id") Long id, Model model) {
    return null;
  }

  @RequestMapping(value = "", method = RequestMethod.POST)
  public String saveUpdate(@ModelAttribute("<%= controllerClass_cc %>") @Valid <%= controllerClass %>Dto <%= controllerClass_cc %>Dto, BindingResult result, Model model) {
    return null;
  }

}