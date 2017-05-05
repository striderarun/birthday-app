package com.events.rest;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.events.beans.GroupBean;
import com.events.beans.UserBean;
import com.events.logging.Loggable;
import com.events.service.GroupService;

@RestController
@RequestMapping(value = "/services/groups")
public class GroupRestService {

	@Autowired
	private GroupService groupService;
	
	@Loggable
	@RequestMapping(method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<GroupBean> getGroups() {
		return groupService.getGroups();
	}
	
	@Loggable
	@RequestMapping(method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.CREATED)
	public GroupBean createGroup(@RequestBody @NotNull @Valid GroupBean groupBean) {
		return groupService.createGroup(groupBean);
	}
	
	@Loggable
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<UserBean> getGroupUsers(@PathVariable Long id) {
		return groupService.getGroupUsers(id);
	}
	
	@Loggable
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.OK)
	public void deleteGroup(@PathVariable Long id) {
		groupService.deleteGroup(id);
	}
	
}
