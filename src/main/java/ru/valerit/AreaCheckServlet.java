package ru.valerit;

import data.GeometryValidator;
import data.JSONBuilder;
import data.RequestDataBean;
import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Locale;

@WebServlet("/areacheck")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        double x = Double.parseDouble(req.getParameter("x"));
        double y = Double.parseDouble(req.getParameter("y"));
        int r = Integer.parseInt(req.getParameter("r"));


        RequestDataBean requestData = new RequestDataBean();
        requestData.setX(x);
        requestData.setY(y);
        requestData.setR(r);
        requestData.setFlag(GeometryValidator.isInsideArea(x,y,r));

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        PrintWriter out = resp.getWriter();
        out.print(JSONBuilder.buildJson(requestData));
        out.flush();



        ServletContext context = getServletContext();
        List<RequestDataBean> globalRequestDataList = (List<RequestDataBean>) context.getAttribute("globalRequestDataList");
        globalRequestDataList.add(requestData);


    }


}
