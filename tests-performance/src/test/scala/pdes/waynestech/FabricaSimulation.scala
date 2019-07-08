package pdes.waynestech

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._

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
    
  setUp(scn.inject(atOnceUsers(50)).protocols(httpProtocol))
}

