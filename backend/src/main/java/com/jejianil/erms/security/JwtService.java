package com.jejianil.erms.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import com.jejianil.erms.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.function.Function;
import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Date;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import java.security.Key;
import jakarta.annotation.PostConstruct;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long jwtExpiration;



    @PostConstruct
    public void init() {
        System.out.println("JWT Secret Loaded: " + secretKey);
    }

    private Key getSigningKey() {

        byte[] keyBytes = Decoders.BASE64.decode(secretKey);

        return Keys.hmacShaKeyFor(keyBytes);

    }

    public String generateToken(User user) {

        Map<String, Object> claims = new HashMap<>();

        claims.put("role", user.getRole().getRoleName());

        return Jwts.builder()
                .claims(claims)
                .subject(user.getUsername())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    public String extractUsername(String token) {

        return extractClaim(
                token,
                Claims::getSubject
        );

    }
    public <T> T extractClaim(
            String token,
            Function<Claims, T> claimsResolver
    ) {
            Claims claims = extractAllClaims(token);

            return claimsResolver.apply(claims);
    }
    private Claims extractAllClaims(String token) {

        return Jwts.parser()
                .verifyWith((javax.crypto.SecretKey) getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    public boolean isTokenValid(String token, UserDetails userDetails) {

        final String username = extractUsername(token);

        return username.equals(userDetails.getUsername())
                && !isTokenExpired(token);
    }

}

