package com.events.beans;

import java.io.Serializable;

import org.hibernate.validator.constraints.NotBlank;

public class GroupBean implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    
    @NotBlank
    private String name;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
    
    
}