package com.projeto.starter.configs;

import java.util.ArrayList;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.VendorExtension;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig extends WebMvcConfigurationSupport {
	
	/*
	 * Solução para swagger: https://stackoverflow.com/questions/49155420/springfox-swagger-ui-html-unable-to-infer-base-url-caused-by-missing-cookies
	 * *
	 */
	
	@Bean
	public Docket productApi() {
		return new Docket(DocumentationType.SWAGGER_2)
				.select().apis(RequestHandlerSelectors.basePackage("com.projeto.starter"))
				.paths(PathSelectors.any())
				.build()
				.apiInfo(metaData());
				
	}
	
	private ApiInfo metaData() {
		return new ApiInfo("Projeto 2 - REST API ",
				"O projeto se desenvolveu a partir de um cenário onde existia uma empresa de vendas que possuía vendedores  e  gerentes  e  produtos  a  serem  vendidos  para  os  clientes  e  havia  a  necessidade  do  sistemarealizar vendas e gerar relatórios.\n" + 
				"A proposta dessa atividade visa complementação do plano de formação de estágio.",
				"1.0.0", 
				"Terms of Service", 
				new Contact("Rodrigo Rocha", "", "rodrigorochasantos@outlook.com"),
				"Apache License 2.0", 
				"http://www.apache.org/licenses/LICENSE-2.0", 
				new ArrayList<VendorExtension>()
		);
	}
	
	@Override
    protected void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("swagger-ui.html")
                .addResourceLocations("classpath:/META-INF/resources/");
 
        registry.addResourceHandler("/webjars/**")
                .addResourceLocations("classpath:/META-INF/resources/webjars/");
    }
}
