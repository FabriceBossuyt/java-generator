package <%= packageName %>.scheduler.jobs;

import org.quartz.DisallowConcurrentExecution;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;

@Component
@DisallowConcurrentExecution
public class <%= jobClassName %> extends QuartzJobBean {

  @Override
  public void executeInternal(JobExecutionContext context) throws JobExecutionException {
    //add job to execute here
  }
}
