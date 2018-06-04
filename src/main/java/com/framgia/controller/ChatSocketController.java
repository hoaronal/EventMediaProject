package com.framgia.controller;

import java.security.Principal;

import org.apache.log4j.Logger;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.framgia.bean.Message;
import com.framgia.bean.MessageGreeter;
import com.framgia.util.Helpers;

/**
 * Created by phan.van.hieu@framgia.com on 6/3/2017
 */
@RestController
public class ChatSocketController {

	// log
	private static final Logger logger = Logger.getLogger(ManageUserController.class);

	@MessageMapping("/request")
	@SendTo("/topic/greetings")
	public MessageGreeter greeting(Message message, Principal principal) throws Exception {

		logger.info("Request service: " + message.getName());
		return new MessageGreeter(principal.getName() + " : &lt;b&gt;" + message.getName() + "&lt;/b&gt;");
	}

	@RequestMapping(value = "/chat", method = RequestMethod.GET)
	public ModelAndView chatPage() {

		logger.info("Call page chat client");
		return new ModelAndView("chat", "userlogin", Helpers.getUsername());
	}
}
