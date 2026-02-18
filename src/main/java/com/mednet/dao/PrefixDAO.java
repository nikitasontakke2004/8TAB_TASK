package com.mednet.dao;

import com.mednet.model.Prefix;
import com.mednet.util.HibernateUtil;
import org.hibernate.*;
import java.util.List;

public class PrefixDAO {
    public void save(Prefix p) {
        Session s = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = s.beginTransaction();
        s.saveOrUpdate(p);
        tx.commit();
        s.close();
    }

    public List<Prefix> list() {
        Session s = HibernateUtil.getSessionFactory().openSession();
        List<Prefix> list = s.createQuery("from Prefix").list();
        s.close();
        return list;
    }

    public void delete(int id) {
        Session s = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = s.beginTransaction();
        Prefix p = (Prefix) s.get(Prefix.class, id);
        if(p != null) s.delete(p);
        tx.commit();
        s.close();
    }
}