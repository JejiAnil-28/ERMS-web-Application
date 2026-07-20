package com.jejianil.erms.security;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            CustomUserDetailsService userDetailsService
    ) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        String path = request.getServletPath();

        System.out.println("========================================");
        System.out.println("Request Path : " + path);

        // Skip authentication endpoints
        if (path.startsWith("/api/v1/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");
        System.out.println("Authorization Header : " + authHeader);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("No Bearer Token Found");
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = authHeader.substring(7);

        try {

            System.out.println("JWT Token : " + jwt);

            String username = jwtService.extractUsername(jwt);
            System.out.println("Username From Token : " + username);

            if (username != null &&
                    SecurityContextHolder.getContext().getAuthentication() == null) {

                UserDetails userDetails =
                        userDetailsService.loadUserByUsername(username);

                System.out.println("User Loaded Successfully");
                System.out.println("Authorities : " + userDetails.getAuthorities());

                boolean isValid =
                        jwtService.isTokenValid(jwt, userDetails);

                System.out.println("Token Valid : " + isValid);

                if (isValid) {

                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    authenticationToken.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );

                    SecurityContextHolder.getContext()
                            .setAuthentication(authenticationToken);

                    System.out.println("Authentication Set Successfully");
                } else {

                    System.out.println("Invalid JWT Token");
                }
            }

        } catch (JwtException ex) {

            System.out.println("JWT Exception");
            ex.printStackTrace();

        } catch (Exception ex) {

            System.out.println("Unexpected Exception");
            ex.printStackTrace();
        }

        filterChain.doFilter(request, response);
    }
}