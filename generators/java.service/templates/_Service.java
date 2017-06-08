package <%= packageName %>.service;
import <%= packageName %>.dto.<%= serviceClass %>Dto;

<% if (extendsBaseService == true) { %>
public interface <%= serviceClass %>Service extends BaseService<<%= serviceClass %>Dto> {
<% } else { %>
public interface <%= serviceClass %>Service {
<% } %>
}