package com.mednet.dao;

import com.mednet.model.Prefix;
import com.mednet.util.HibernateUtil;
import org.hibernate.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PrefixDAO {


    private Session getSession() {
        return HibernateUtil.getSessionFactory().openSession();
    }

    public void save(Prefix p) {
        Session s = getSession(); // Called here
        Transaction tx = s.beginTransaction();
        s.saveOrUpdate(p);
        tx.commit();
        s.close();
    }

    public List<Prefix> list() {
        Session s = getSession(); // Called here
        List<Prefix> list = s.createQuery("from Prefix").list();
        s.close();
        return list;
    }

    public void delete(int id) {
        Session s = getSession(); // Called here
        Transaction tx = s.beginTransaction();
        Prefix p = (Prefix) s.get(Prefix.class, id);
        if(p != null) s.delete(p);
        tx.commit();
        s.close();
    }
}
