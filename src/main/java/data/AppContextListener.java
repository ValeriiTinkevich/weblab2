package data;

import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@WebListener
public class AppContextListener implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        List<RequestDataBean> requestDataList = new CopyOnWriteArrayList<>();
        ServletContext context = sce.getServletContext();
        context.setAttribute("globalRequestDataList", requestDataList);
    }

}
