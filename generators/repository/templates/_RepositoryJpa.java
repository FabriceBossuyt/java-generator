package <%= packageName %>.repository.jpa;

import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import javax.persistence.TypedQuery;
import javax.persistence.NoResultException;

import <%= packageName %>.repository.<%= repositoryName %>Repository;
import <%= packageName %>.model.<%= repositoryName %>;

@Repository<% if(implementsBaseRepository == true) { %>
public class <%= repositoryName %>RepositoryJpa implements <%= repositoryName %>Repository {
<% } else { %>
public class <%= repositoryName %>Repository {
<% } %>
  @PersistenceContext
  private EntityManager em;
<% if(implementsBaseRepository == true) { %>
  /* (non-Javadoc)
   * @see <%= packageName %>.repository.BaseRepository#save(java.lang.Object)
   */
  @Override
  public <%= repositoryName %> save(<%= repositoryName %> entity) {
    return em.merge(entity);
  }

  /* (non-Javadoc)
   * @see <%= packageName %>.repository.BaseRepository#findAll()
   */
  @Override
  public List<<%= repositoryName%>> findAll() {
    String queryString = "from <%= repositoryName %> <%= repositoryNamePrefix %>";
    List<<%= repositoryName %>> results = em.createQuery(queryString, <%= repositoryName %>.class)
        .getResultList();
    return results;
  }

  /* (non-Javadoc)
   * @see <%= packageName %>.repository.BaseRepository#findById(java.lang.Long)
   */
  @Override
  public <%= repositoryName %> findById(Long id) {
    String queryString = "from <%= repositoryName %> <%= repositoryNamePrefix %> where <%= repositoryNamePrefix %>.id = :id";
    List<<%= repositoryName %>> results = em.createQuery(queryString, <%= repositoryName %>.class)
        .setParameter("id", id)
        .getResultList();
    return (!results.isEmpty() ? results.get(0) : null);
  }

  /* (non-Javadoc)
   * @see <%= packageName %>.repository.BaseRepository#findAll(int, int, java.lang.String)
   */
  @Override
  public List<<%= repositoryName %>> findAll(int offset, int max) {
    String queryString = "from <%= repositoryName %> <%= repositoryNamePrefix %>";
    List<<%= repositoryName %>> results = em.createQuery(queryString, <%= repositoryName %>.class)
        .setFirstResult(offset)
        .setMaxResults(max)
        .getResultList();
    return results;
  }

  /* (non-Javadoc)
   * @see <%= packageName %>.repository.BaseRepository#countBySearchFilter(java.lang.String)
   */
  @Override
  public Long count() {
    Long count = 0L;
    String queryString = "select count(<%= repositoryNamePrefix %>.id) from <%= repositoryName %> <%= repositoryNamePrefix %>";
    TypedQuery<Long> results = em.createQuery(queryString, Long.class);

    try {
      count = results.getSingleResult();
    } catch (NoResultException e) {}
    return count;
  }
<% } %>
}