package <%= packageName %>.dto;
<% if (extendBaseDto == true) { %>
public class <%= dtoClass %> extends BaseDto {
<% } else { %>
public class <%= dtoClass %> {
<% } %>
  public <%= dtoClass %>() {
    
  }

}