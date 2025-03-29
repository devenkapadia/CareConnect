package com.speproject.user_service.filter;

import com.speproject.user_service.helper.AuthHelper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final AuthHelper authHelper;

    public JwtAuthenticationFilter(AuthHelper authHelper) {
        this.authHelper = authHelper;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            // Extract and validate JWT, returning the email if valid
            String id = authHelper.extractAndCheckJWT(request);

            // If JWT is valid and no authentication is set, create an Authentication object
            if (id != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                // Create an Authentication object with the email as the principal
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        id, null, null); // You can add authorities (roles) in the third parameter if needed
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            // Handle unauthorized access
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Unauthorized: " + e.getMessage());
        }
    }
}