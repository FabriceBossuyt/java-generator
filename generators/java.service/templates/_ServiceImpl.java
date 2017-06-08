package <%= packageName %>.service.impl;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.ArrayList;


import <%= packageName %>.service.<%= serviceClass %>Service;
import <%= packageName %>.dto.<%= serviceClass %>Dto;
import <%= packageName %>.repository.<%= serviceClass %>Repository;
import <%= packageName %>.model.<%= serviceClass %>;


@Service
@Transactional<% if(implementsBaseService == true) { %>
public class <%= serviceClass %>ServiceImpl implements <%= serviceClass %>Service {
<% } else { %>
public class <%= serviceClass %>ServiceImpl {
<% } %>
  private final Logger log = LogManager.getLogger(<%= serviceClass %>Service.class);
<% if(implementsBaseService == true) { %>

  private <%= serviceClass %>Repository <%= serviceClass_cc %>Repository;

  @Autowired
  public <%= serviceClass %>ServiceImpl(<%= serviceClass %>Repository <%= serviceClass_cc %>Repository) {
    this.<%= serviceClass_cc %>Repository = <%= serviceClass_cc %>Repository;
  }

  /* (non-Javadoc)
   * @see <%= packageName %>.service.BaseService#save(java.lang.Object)
   */
  @Override
  public <%= serviceClass %>Dto save(<%= serviceClass %>Dto dto) {
    <%= serviceClass %>Dto retval = null;

    <%= serviceClass %> result = <%= serviceClass_cc %>Repository.save(
      mapTo(dto));

    if (result != null)
      retval = mapTo(result);

    return retval;
  }

  /* (non-Javadoc)
   * @see <%= packageName %>.service.BaseService#getById(java.lang.Long)
   */
  @Override
  public <%= serviceClass %>Dto getById(Long id) {
    return mapTo(
      <%= serviceClass_cc %>Repository.findById(id));
  }

  /* (non-Javadoc)
   * @see <%= packageName %>.service.BaseService#getAll()
   */
  @Override
  public List<<%= serviceClass %>Dto> getAll() {
    return mapTo(
      <%= serviceClass_cc %>Repository.findAll());
  }

  /* (non-Javadoc)
   * @see <%= packageName %>.service.BaseService#getAll(java.lang.Integer offset, java.lang.Integer max)
   */
  @Override
  public List<<%= serviceClass %>Dto> getAll(Integer offset, Integer max) {
    return mapTo(
      <%= serviceClass_cc %>Repository.findAll(offset, max));
  }

  /* (non-Javadoc)
   * @see <%= packageName %>.service.BaseService#count()
   */
  @Override
  public Long count() {
    return <%= serviceClass_cc %>Repository.count();
  }

  /**
   * Map a Dto to an Entity.
   * 
   * @param <%= serviceClass %>Dto dto
   * @return <%= serviceClass %>
   */
  private <%= serviceClass %> mapTo(<%= serviceClass %>Dto dto) {
    <%= serviceClass %> entity = <%= serviceClass_cc %>Repository.findById(dto.getId());
    if (entity == null)
      entity = new <%= serviceClass %>();

    // TODO: fillin the entity with data.
    return entity;
  }

  /**
   * Map an Entity to a Dto.
   *
   * @param <%= serviceClass %> entity
   * @return <=% serviceClass %>Dto
   */
  private <%= serviceClass %>Dto mapTo(<%= serviceClass %> entity) {
    <%= serviceClass %>Dto dto = new <%= serviceClass %>Dto();

    // TODO: fill in the dto with data.
    return dto;
  }

  /**
   * Map a list of Entities to a Dto list.
   * 
   * @param List<<%= serviceClass %>> entities
   * @return List<<=% serviceClass %>Dto>
   */
  private List<<%= serviceClass %>Dto> mapTo(List<<%= serviceClass %>> entities) {
    List<<%= serviceClass %>Dto> retval = new ArrayList<<%= serviceClass %>Dto>();
    if (entities == null || entities.isEmpty())
      return retval;
    for (<%= serviceClass %> entity : entities) {
      retval.add(
        mapTo(entity));
    }
    return retval;
  }

<% } %>
}