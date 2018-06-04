package com.framgia.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class PageNotFoundController {
	
	@RequestMapping(value = "/404", method = RequestMethod.GET)
	public String pagenotfoundPage(ModelMap model) {		
		return "pagenotfound";
	}
}
