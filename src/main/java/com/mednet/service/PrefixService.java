package com.mednet.service;

import com.mednet.model.Prefix;
import com.mednet.util.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;
import java.util.List;

public class PrefixService {

    public String savePrefix(String prefix, String gender, String prefixOf) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        Prefix p = new Prefix();
        p.setPrefix(prefix);
        p.setGender(gender);
        p.setPrefixOf(prefixOf);
        session.save(p);
        tx.commit();
        session.close();
        return "Success";
    }

    public List<Prefix> getAllPrefixes() {
        Session session = HibernateUtil.getSessionFactory().openSession();
        List<Prefix> list = session.createQuery("from Prefix", Prefix.class).list();
        session.close();
        return list;
    }

    public void deletePrefix(int id) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = session.beginTransaction();
        Prefix p = session.get(Prefix.class, id);
        if (p != null) session.delete(p);
        tx.commit();
        session.close();
    }
}