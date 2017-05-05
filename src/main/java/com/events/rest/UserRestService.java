package com.events.rest;

import java.io.IOException;
import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.events.beans.StatusBean;
import com.events.beans.UserBean;
import com.events.logging.Loggable;
import com.events.service.UserService;

@Controller
@RequestMapping(value = "/services/users")
public class UserRestService {

    @Autowired
    private UserService userService;

    @Loggable
    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<UserBean> getUsers() {
        return userService.getUsers();
    }

    @Loggable
    @RequestMapping(method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public UserBean createUser(@RequestBody @NotNull @Valid UserBean userBean) {
        return userService.createUser(userBean);
    }

    @Loggable
    @RequestMapping(value = "/{id}/image", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public StatusBean uploadProfileImage(@PathVariable Long id, @RequestParam("image") MultipartFile image) throws IOException {
        userService.uploadUserImage(id, image.getBytes());
        return new StatusBean("Success");
    }

    @Loggable
    @RequestMapping(value = "/{id}/image", method = RequestMethod.GET, produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public byte[] getProfileImage(@PathVariable Long id) {
        return userService.getUserImage(id);
    }
}
