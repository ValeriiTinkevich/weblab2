plugins {
    id("java")
    id("war")
}

group = "ru.valerit"
version = ""

repositories {
    mavenCentral()
}
java {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
}

dependencies {
    testImplementation(platform("org.junit:junit-bom:5.10.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    implementation("jakarta.servlet:jakarta.servlet-api:5.0.0")
    providedRuntime("org.wildfly:wildfly-ee-feature-pack-parent:34.0.0.Final")  // Adjust to match your WildFly version

}


tasks.register("deployToServer") {
    group = "deployment"
    description = "Builds the project, transfers .war to server, restarts WildFly"

    dependsOn("build") // Ensure the project is built before deploying

    doLast {
        val remoteUser = System.getenv("DEPLOYUSER")
        val remoteHost = System.getenv("DEPLOYHOST")
        val remotePath = "wildfly-34.0.0.Final/standalone/deployments/"
        val warFile = layout.buildDirectory.file("libs/lab2web.war").get().asFile.absolutePath
        val wildFlyStopCommand = "pkill -f wildfly"
        val wildFlyStartCommand = "nohup wildfly-34.0.0.Final/bin/standalone.sh -b 0.0.0.0&"
        val password = System.getenv("DEPLOYPWD")

        exec {
            commandLine("pscp", "-pw", password, warFile, "$remoteUser@$remoteHost:$remotePath")
        }

        exec {
            commandLine("plink", "-batch", "-pw", password, "$remoteUser@$remoteHost", wildFlyStopCommand)
            isIgnoreExitValue = true // Continue even if exit code isn't 0

        }

        exec {
            commandLine("plink", "-batch", "-pw", password, "$remoteUser@$remoteHost", wildFlyStartCommand, "exit")
            isIgnoreExitValue = true
        }
    }
}

tasks.test {
    useJUnitPlatform()
}
