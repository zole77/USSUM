package com.mycom.ussum;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI().info(new Info()
                .title("springdoc-api")
                .version("1.0").description("springdoc-openai swagger-ui 화면입니다."));
    }

    @Bean
    public GroupedOpenApi api() {
        String[] paths = {"/api/**"};
        String[] packages = {"com.mycom.ussum"};
        return GroupedOpenApi.builder().group("springdoc-api").pathsToMatch(paths).packagesToScan(packages).build();
    }
}
