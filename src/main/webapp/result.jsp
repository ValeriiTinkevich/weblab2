<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="java.util.List" %>
<%@ page import="data.RequestDataBean" %>
<html>
<head>
    <title>Результаты</title>
    <style>
        body {
            background-size: cover;
            background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(74, 9, 121, 1) 47%, rgba(0, 212, 255, 1) 100%) no-repeat center;
            height: 100vh;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            color: white;
        }

        /* Затемняем экран */
        body::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5); /* Полупрозрачный черный фон */
            z-index: 1; /* Подложка под контентом */
        }

        .content {
            position: relative; /* Для корректного позиционирования содержимого */
            z-index: 2; /* Выше затемненного фона */
            background-color: rgba(0, 0, 0, 0.7); /* Темно-прозрачный фон для таблицы */
            padding: 20px; /* Отступы внутри блока */
            border-radius: 10px; /* Закругление углов */
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Тень для блока */
        }

        table {
            width: 100%; /* Ширина таблицы на всю ширину контейнера */
            border-collapse: collapse; /* Убираем двойные границы */
        }

        th, td {
            padding: 10px; /* Отступы для ячеек */
            text-align: left; /* Выравнивание текста */
        }

        th {
            background-color: rgba(255, 255, 255, 0.2); /* Полупрозрачный фон для заголовков */
        }
    </style>
</head>
<body>
<div class="content">
    <h2>История проверок</h2>
    <table>
        <tr>
            <th>X</th>
            <th>Y</th>
            <th>R</th>
            <th>Результат</th>
        </tr>
        <%
            List<RequestDataBean> collection = (List<RequestDataBean>) request.getServletContext().getAttribute("globalRequestDataList");
            if (collection != null) {
                for (RequestDataBean data : collection) {
        %>
        <tr>
            <td><%= data.getX() %></td>
            <td><%= data.getY() %></td>
            <td><%= data.getR() %></td>
            <td><%= data.getFlag() ? "Попадает" : "Не попадает" %></td>
        </tr>
        <%
            }
        } else {
        %>
        <tr>
            <td colspan="4">Нет данных для отображения.</td>
        </tr>
        <%
            }
        %>
    </table>

    <br>
    <a href="/">ДОМОЙ</a>
</div>
</body>
</html>
