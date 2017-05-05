package com.events.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.convert.ConversionService;
import org.springframework.stereotype.Service;

import com.events.beans.UserBean;
import com.events.config.ConversionConfig;
import com.events.domain.User;
import com.events.repository.UserRepository;
import com.events.service.UserService;


@Service
public class UserServiceImpl implements UserService {

	@Resource
	private UserRepository userRepository;
	
	@Autowired
	private BeanMapper mapper;
	
	@Autowired
    @Qualifier(ConversionConfig.CONVERSION_SERVICE)
    private ConversionService conversionService; 
	
	@Override
	public UserBean createUser(UserBean userBean) {
		User user = conversionService.convert(userBean, User.class);
		user = userRepository.save(user);
		return mapper.map(user, UserBean.class, null);
	}

	@Override
	public List<UserBean> getUsers() {
		List<User> users = userRepository.findAll();
		return mapper.mapIterable(users, UserBean.class, null);
	}

	@Override
	public void deleteUser(Long id) {
		userRepository.delete(id);
	}

	@Override
	public void uploadUserImage(Long id, byte[] image) {
		User user = userRepository.findOne(id);
		user.setProfileImage(image);
		userRepository.save(user);
	}

	@Override
	public byte[] getUserImage(Long id) {
		User user = userRepository.findOne(id);
		return user.getProfileImage();
	}

}
