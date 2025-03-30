package com.speproject.admin_service.helper;

import com.speproject.admin_service.exception.CustomException.UnauthorizedException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

@Component
public class AuthHelper {
    private final JWTHelper jwtHelper;

    public AuthHelper(JWTHelper jwtHelper) {
        this.jwtHelper = jwtHelper;
    }

    public String extractAndCheckJWT(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            try {
                if (jwtHelper.validateToken(token)) {
                    if(!jwtHelper.extractRole(token).equals("ADMIN")) {
                        throw new UnauthorizedException("Forbidden!");
                    }
                    return jwtHelper.extractId(token);
                }
            } catch (ExpiredJwtException e) {
                throw new UnauthorizedException("Token has expired!");
            } catch (SignatureException e) {
                throw new UnauthorizedException("Invalid token signature!");
            } catch (Exception e) {
                throw new UnauthorizedException("Token validation error!");
            }
        }
        throw new UnauthorizedException("Authorization header is missing or invalid!");
    }

    public String requireValidJWT(HttpServletRequest request) {
        return extractAndCheckJWT(request);
    }
}
