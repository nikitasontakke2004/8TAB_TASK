package com.mednet.util;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import com.mednet.model.Prefix;

public class HibernateUtil {
    private static final SessionFactory sessionFactory = buildSessionFactory();

    private static SessionFactory buildSessionFactory() {
        try {
            return new Configuration().configure().addAnnotatedClass(Prefix.class).buildSessionFactory();
        } catch (Throwable ex) {
            throw new ExceptionInInitializerError(ex);
        }
    }

    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}