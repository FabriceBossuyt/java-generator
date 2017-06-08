package <%= packageName %>.exception;

<% if (extendsException != true) { %>
public class <%= exceptionName %> {

  private String code;
  private String message;

  public <%= exceptionName %>(){
  }

  public <%= exceptionName %>(String code, String message) {
    this.code = code;
    this.message = message;
  }

  /**
   * Get the code
   *
   * @return String
   */
  public String getCode() {
    return code;
  }

  /**
   * Set the code 
   *
   * @param String code
   */
  public void setCode(String code) {
    this.code = code;
  }

  /**
   * Get the message
   *
   * @return String
   */
  public String getMessage() {
    return message;
  }

  /**
   * Set the message 
   *
   * @param String message
   */
  public void setMessage(String message) {
    this.message = message;
  }
<% } else {%>
  public class <%= exceptionName %> extends Exception{

    /**
   * Default constructor.
   */
  public <%= exceptionName %>() {
    super();
  };

  /**
   * Constructs a new Exception with specified message.
   * 
   * @param String message
   */
  public <%= exceptionName %>(String message) {
    super(message);
  }

  /**
   * Constructs a new Exception with specified details and cause.
   * 
   * @param String message
   * @param Throwable cause
   */
  public <%= exceptionName %>(String message, Throwable cause) {
    super(message, cause);
  }

  /**
   * Constructs a new Exception with a cause.
   * 
   * @param Throwable cause
   */
  public <%= exceptionName %>(Throwable cause) {
    super(cause);
  }
<% } %>

}
