<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Results</title>
    <link rel="stylesheet" href="style.css">
    <link rel="shortcut icon" href="/resources/favicon.ico" type="image/x-icon">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://jsxgraph.uni-bayreuth.de/distrib/jsxgraphcore.js"></script>
</head>

<body>
    <!-- Header -->
    <div id="header-plate" class="box">
        <h1>Тынкевич Валерий Николаевич P3215</h1>
        <span id="datetimelabel">Current datetime: </span>
        <span id="datetime"> </span>
    </div>


    <div class="main-container">
        <div id="input-row" class="box">
            <p>Input your x</p>
            <input id="xInput" name="xInput" type="text">
            <p>Input your y</p>
            <div id="yInputbox">
                <div class="checkboxY">
                    <input type="checkbox" name="checkbox" value="-3" class="inline"><label>-3</label>
                </div>
                <div class="checkboxY">
                    <input type="checkbox" name="checkbox" value="-2" class="inline"><label>-2</label>
                </div>
                <div class="checkboxY">
                    <input type="checkbox" name="checkbox" value="-1" class="inline"><label>-1</label>
                </div>
                <div class="checkboxY">
                    <input type="checkbox" name="checkbox" value="0" class="inline"><label>0</label>
                </div>
                <div class="checkboxY">
                    <input type="checkbox" name="checkbox" value="1" class="inline"><label>1</label>
                </div>
                <div class="checkboxY">
                    <input type="checkbox" name="checkbox" value="2" class="inline"><label>2</label>
                </div>
                <div class="checkboxY">
                    <input type="checkbox" name="checkbox" value="3" class="inline"><label>3</label>
                </div>
                <div class="checkboxY">
                    <input type="checkbox" name="checkbox" value="4" class="inline"><label>4</label>
                </div>
                <div class="checkboxY">
                    <input type="checkbox" name="checkbox" value="5" class="inline"><label>5</label>
                </div>
            </div>
            <p>Input your R</p>
            <div id="rInputbox">

                <div class="radioboxR">
                    <input class="radioR" name="R" type="radio" value="1" checked="checked"><label>1</label>
                </div>
                <div class="radioboxR">
                    <input class="radioR" name="R" type="radio" value="2"><label>2</label>
                </div>
                <div class="radioboxR">
                    <input class="radioR" name="R" type="radio" value="3"><label>3</label>
                </div>
                <div class="radioboxR">
                    <input class="radioR" name="R" type="radio" value="4"><label>4</label>
                </div>
                <div class="radioboxR">
                    <input class="radioR" name="R" type="radio" value="5"><label>5</label>
                </div>
            </div>
            <div>
                <button id="submitButton" disabled>Submit</button>
            </div>
            <a href="result.jsp" >Поехать к результату</a>
            <p id="response"></p>

        </div>
        <div id="graphBlock">
            <div id="jxgbox" class="jxgbox"></div>
            <p id="errorMessage"></p>
            <p class="testing-times" id="latestTime"></p>
            <p class="testing-times" id="scriptTime"></p>
            <p class="testing-times" id="serverTime"></p>
        </div>
    </div>
    <script src="js/script.js"></script>
    <footer><img src="madoka.gif" alt=""></footer>
</body>

</html>