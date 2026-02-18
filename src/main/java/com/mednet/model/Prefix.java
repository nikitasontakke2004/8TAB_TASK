package com.mednet.model;

import javax.persistence.*;

@Entity
@Table(name = "prefix")
public class Prefix {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String prefix;
    private String gender;
    private String prefixOf;

    // Default Constructor
    public Prefix() {}

    // Getters and Setters
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getPrefix() {
        return prefix;
    }
    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }
    public String getGender() {
        return gender;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }
    public String getPrefixOf() {
        return prefixOf;
    }
    public void setPrefixOf(String prefixOf) {
        this.prefixOf = prefixOf;
    }
}