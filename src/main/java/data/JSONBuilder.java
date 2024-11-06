package data;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

public class JSONBuilder {

    public static String buildJson(RequestDataBean data) {
        return String.format(Locale.US, "{\"x\": %.10f, \"y\": %.10f, \"r\": %d, \"flag\": %s}",
                data.getX(), data.getY(), data.getR(), data.getFlag());
    }
    public static String buildJson(List<RequestDataBean> dataList) {

        return dataList.stream()
                .map(data -> String.format(Locale.US, "{\"x\": %.10f, \"y\": %.10f, \"r\": %d, \"flag\": %s}",
                        data.getX(), data.getY(), data.getR(), data.getFlag()))
                .collect(Collectors.joining(", ", "[", "]"));
    }
}
