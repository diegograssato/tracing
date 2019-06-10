package org.dtux.trap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping("/trips")
public class TripController {

    private Logger logger = LoggerFactory.getLogger(TripController.class.getName());
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    @GetMapping
    public String getTrip() {

        String data = "The time is now " + dateFormat.format(new Date());

        logger.info(data);
            logger.debug(">>> Call to zipkin");
        logger.debug(data);

        return data;
    }

}