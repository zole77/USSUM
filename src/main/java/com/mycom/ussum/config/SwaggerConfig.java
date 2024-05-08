package com.mycom.ussum.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    //swagger 실행은 localhost:8080/swagger-ui/index.html
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI().info(new Info()
                .title("USSUM-api")
                .version("1.0").description("springdoc-openai swagger-ui 화면입니다."));
    }

    @Bean
    public GroupedOpenApi api() {
        String[] paths = {"/api/**", "/member/**", "/board/**", "/tui-editor/**", "/comment/**"};
        String[] packages = {"com.mycom.ussum"};
        return GroupedOpenApi.builder().group("springdoc-api").pathsToMatch(paths).packagesToScan(packages).build();
    }
}
