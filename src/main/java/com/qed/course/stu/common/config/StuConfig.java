package com.qed.course.stu.common.config;

/**
 * Created by lonel on 2016/3/16.
 */

import com.jfinal.config.*;
import com.jfinal.core.JFinal;
import com.jfinal.ext.interceptor.SessionInViewInterceptor;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.druid.DruidPlugin;
import com.jfinal.plugin.ehcache.EhCachePlugin;
import com.jfinal.render.ViewType;
import com.qed.course.stu.controller.*;
import com.qed.course.stu.model._MappingKit;

/**
 * API引导式配置
 */
public class StuConfig extends JFinalConfig {

    @Override
    public void configConstant(Constants constants) {
        // 加载少量必要配置，随后可用PropKit.get(...)获取值
        PropKit.use("config.properties");
        constants.setDevMode(PropKit.getBoolean("devMode", false));
        //配置模板
        constants.setViewType(ViewType.JSP);
    }

    @Override
    public void configRoute(Routes routes) {
        routes.add("/", IndexController.class);
        routes.add("/stu", StuController.class);
    }

    public static DruidPlugin createDruidPlugin() {
        return new DruidPlugin(PropKit.get("jdbcUrl"), PropKit.get("user"), PropKit.get("password").trim());
    }

    @Override
    public void configPlugin(Plugins plugins) {
        // 配置Druid数据库连接池插件
        DruidPlugin druidPlugin = createDruidPlugin();
        druidPlugin.set(PropKit.getInt("initialSize"), PropKit.getInt("minIdle"), PropKit.getInt("maxActive"));
        druidPlugin.setMaxWait(PropKit.getInt("maxWait"));
        druidPlugin.setTimeBetweenConnectErrorMillis(PropKit.getInt("timeBetweenEvictionRunsMillis"));
        druidPlugin.setMinEvictableIdleTimeMillis(PropKit.getInt("minEvictableIdleTimeMillis"));
        druidPlugin.setValidationQuery(PropKit.get("validationQuery"));
        druidPlugin.setTestWhileIdle(PropKit.getBoolean("testWhileIdle"));
        druidPlugin.setTestOnBorrow(PropKit.getBoolean("testOnBorrow"));
        druidPlugin.setTestOnReturn(PropKit.getBoolean("testOnReturn"));
        druidPlugin.setMaxPoolPreparedStatementPerConnectionSize(PropKit.getInt("maxPoolPreparedStatementPerConnectionSize"));
        druidPlugin.setFilters("stat,wall");
        plugins.add(druidPlugin);
        plugins.add(new EhCachePlugin());

        // 配置ActiveRecord插件
        ActiveRecordPlugin arp = new ActiveRecordPlugin(druidPlugin);
        arp.setShowSql(PropKit.getBoolean("showSql", false));
        plugins.add(arp);
        // 所有配置在 MappingKit 中搞定
        _MappingKit.mapping(arp);
    }

    @Override
    public void configInterceptor(Interceptors interceptors) {
        interceptors.add(new SessionInViewInterceptor());
        //interceptors.add(new ExceptionInterceptor());
    }

    @Override
    public void configHandler(Handlers handlers) {

    }

    @Override
    public void afterJFinalStart() {
        //加载资源文件
    }

    /**
     * 建议使用 JFinal 手册推荐的方式启动项目
     * 运行此 main 方法可以启动项目，此main方法可以放置在任意的Class类定义中，不一定要放于此
     */
    public static void main(String[] args) {
        JFinal.start("webapp", 8080, "/", 5);
    }
}
