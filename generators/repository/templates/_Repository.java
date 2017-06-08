package <%= packageName %>.repository;

import <%= packageName %>.model.<%= repositoryName %>;

<% if (extendBaseRepository == true) { %>
public interface <%= repositoryName %>Repository extends BaseRepository<<%= repositoryName %>> {
<% } else { %>
public interface <%= repositoryName %>Repository {
<% } %>
}
