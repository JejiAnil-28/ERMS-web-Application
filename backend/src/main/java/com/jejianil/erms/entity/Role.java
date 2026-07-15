    package com.jejianil.erms.entity;

    import jakarta.persistence.*;

    import java.util.List;

    @Entity
    @Table(name = "roles")
    public class Role {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name = "role_name", nullable = false, unique = true)
        private String roleName;

        @Column(length = 255)
        private String description;

        public Role() {
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getRoleName() {
            return roleName;
        }

        public void setRoleName(String roleName) {
            this.roleName = roleName;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }
        @OneToMany(mappedBy = "role")
        private List<User> users;
    }