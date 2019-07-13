package pdes.waynestech

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._
import java.util.UUID.randomUUID

class BasicSimulation extends Simulation {

  val httpProtocol = http
    .acceptHeader("application/json")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("en-US,en;q=0.5")
    .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:16.0) Gecko/20100101 Firefox/16.0")

  val scn = scenario("Scenario")
    .exec(http("Get Usuarios")
      .get("http://localhost:8080/api/")
      .check(status.is(200)))
    .pause(1)

    .exec(http("GET Usuario")
      .get("http://localhost:8080/api/prueba/"))
    .pause(1)

     .exec(http("Create Usuario")
      .post("http://localhost:8080/api/" + randomUUID().toString()))
    .pause(10)



  setUp(scn.inject(atOnceUsers(10)).protocols(httpProtocol))
}

