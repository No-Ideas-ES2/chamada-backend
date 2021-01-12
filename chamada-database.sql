--
-- PostgreSQL database configuration
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;
SET default_tablespace = '';
SET default_table_access_method = heap;


CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- TYPES
--

CREATE TYPE public.usuario_tipo_enum AS ENUM (
    'admin',
    'professor',
    'aluno'
);

ALTER TYPE public.usuario_tipo_enum OWNER TO ekrumsedfcjcib;



--
-- TABLES
--

CREATE TABLE public.aula (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    turma_id uuid,
    data timestamp without time zone NOT NULL,
    duracao integer NOT NULL,
    criado_em timestamp without time zone DEFAULT now() NOT NULL,
    atualizado_em timestamp without time zone DEFAULT now() NOT NULL,
    excluido_em timestamp without time zone
);

ALTER TABLE public.aula OWNER TO ekrumsedfcjcib;



CREATE TABLE public.chamada (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    aula_id uuid,
    carencia integer NOT NULL,
    criado_em timestamp without time zone DEFAULT now() NOT NULL,
    atualizado_em timestamp without time zone DEFAULT now() NOT NULL,
    excluido_em timestamp without time zone
);

ALTER TABLE public.chamada OWNER TO ekrumsedfcjcib;



CREATE TABLE public.disciplina (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    codigo character varying NOT NULL,
    nome character varying NOT NULL,
    criado_em timestamp without time zone DEFAULT now() NOT NULL,
    atualizado_em timestamp without time zone DEFAULT now() NOT NULL,
    excluido_em timestamp without time zone
);

ALTER TABLE public.disciplina OWNER TO ekrumsedfcjcib;



CREATE TABLE public.presenca (
    chamada_id uuid NOT NULL,
    aluno_id uuid NOT NULL,
    data timestamp without time zone NOT NULL
);

ALTER TABLE public.presenca OWNER TO ekrumsedfcjcib;



CREATE TABLE public.turma (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    disciplina_id uuid,
    professor_id uuid,
    descricao character varying NOT NULL,
    criado_em timestamp without time zone DEFAULT now() NOT NULL,
    atualizado_em timestamp without time zone DEFAULT now() NOT NULL,
    excluido_em timestamp without time zone
);

ALTER TABLE public.turma OWNER TO ekrumsedfcjcib;



CREATE TABLE public.turma_alunos (
    turma_id uuid NOT NULL,
    aluno_id uuid NOT NULL
);

ALTER TABLE public.turma_alunos OWNER TO ekrumsedfcjcib;



CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email text NOT NULL,
    salt character varying(20) NOT NULL,
    hash character varying(1024) NOT NULL
);

ALTER TABLE public.users OWNER TO ekrumsedfcjcib;



CREATE TABLE public.usuario (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nome character varying NOT NULL,
    email character varying NOT NULL,
    senha character varying NOT NULL,
    tipo public.usuario_tipo_enum NOT NULL,
    criado_em timestamp without time zone DEFAULT now() NOT NULL,
    atualizado_em timestamp without time zone DEFAULT now() NOT NULL,
    excluido_em timestamp without time zone
);

ALTER TABLE public.usuario OWNER TO ekrumsedfcjcib;



--
-- CONSTRAINTS - primary keys
--

ALTER TABLE ONLY public.disciplina
    ADD CONSTRAINT "PK_disciplina" PRIMARY KEY (id);



ALTER TABLE ONLY public.presenca
    ADD CONSTRAINT "PK_presenca" PRIMARY KEY (chamada_id, aluno_id);



ALTER TABLE ONLY public.turma_alunos
    ADD CONSTRAINT "PK_turma_alunos" PRIMARY KEY (turma_id, aluno_id);



ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "PK_usuario" PRIMARY KEY (id);



ALTER TABLE ONLY public.turma
    ADD CONSTRAINT "PK_turma" PRIMARY KEY (id);



ALTER TABLE ONLY public.chamada
    ADD CONSTRAINT "PK_chamada" PRIMARY KEY (id);



ALTER TABLE ONLY public.aula
    ADD CONSTRAINT "PK_aula" PRIMARY KEY (id);


--
-- CONSTRAINTS - unique keys
--

CREATE UNIQUE INDEX UQ_usuario_email ON usuario (email)
    WHERE excluido_em IS NULL;


CREATE UNIQUE INDEX UQ_disciplina_codigo ON disciplina (codigo)
    WHERE excluido_em IS NULL;


ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- INDEXES
--

CREATE INDEX "IDX_turma_alunos_turma_id" ON public.turma_alunos USING btree (turma_id);


CREATE INDEX "IDX_turma_alunos_aluno_id" ON public.turma_alunos USING btree (aluno_id);


--
-- CONSTRAINTS - foreign keys
--

ALTER TABLE ONLY public.turma
    ADD CONSTRAINT "FK_turma_disciplina_id" FOREIGN KEY (disciplina_id) REFERENCES public.disciplina(id);

ALTER TABLE ONLY public.turma
    ADD CONSTRAINT "FK_turma_professor_id" FOREIGN KEY (professor_id) REFERENCES public.usuario(id);



ALTER TABLE ONLY public.chamada
    ADD CONSTRAINT "FK_chamada_aula_id" FOREIGN KEY (aula_id) REFERENCES public.aula(id);



ALTER TABLE ONLY public.turma_alunos
    ADD CONSTRAINT "FK_turma_alunos_turma_id" FOREIGN KEY (turma_id) REFERENCES public.turma(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.turma_alunos
    ADD CONSTRAINT "FK_turma_alunos_aluno_id" FOREIGN KEY (aluno_id) REFERENCES public.usuario(id) ON DELETE CASCADE;



ALTER TABLE ONLY public.aula
    ADD CONSTRAINT "FK_aula_turma_id" FOREIGN KEY (turma_id) REFERENCES public.turma(id);



ALTER TABLE ONLY public.presenca
    ADD CONSTRAINT "FK_presenca_chamada_id" FOREIGN KEY (chamada_id) REFERENCES public.chamada(id);

ALTER TABLE ONLY public.presenca
    ADD CONSTRAINT "FK_presenca_aluno_id" FOREIGN KEY (aluno_id) REFERENCES public.usuario(id);



--
-- VIEWS
--

CREATE VIEW v_chamada AS
    SELECT
        c.id,
        c.aula_id,
        c.carencia,
        a.data,
        d.codigo || ' - ' || t.descricao AS turma,
        c.criado_em,
        c.atualizado_em,
        c.excluido_em
    FROM
        chamada     c
        JOIN aula           a   ON a.id = c.aula_id
        JOIN turma          t   ON t.id = a.turma_id
        JOIN disciplina     d   ON d.id = t.disciplina_id;


CREATE VIEW v_presenca AS
    SELECT vc.aula_id,
        p.chamada_id,
        p.aluno_id,
        p.data,
        u.nome,
        d.codigo || ' - ' || t.descricao AS turma,
    FROM
        presenca    p
        JOIN usuario        u   ON u.id = p.aluno_id
        JOIN chamada        c   ON c.id = p.chamada_id;
        JOIN aula           a   ON a.id = c.aula_id
        JOIN turma          t   ON t.id = a.turma_id
        JOIN disciplina     d   ON d.id = t.disciplina_id;


CREATE VIEW v_turma AS
    SELECT
        t.id,
        t.descricao,
        d.codigo || ' - ' || d.nome AS disciplina,
        u.nome AS professor,
        t.criado_em,
        t.atualizado_em,
        t.excluido_em
    FROM
        turma   t
        JOIN disciplina     d   ON d.id = t.disciplina_id
        JOIN usuario        u   ON u.id = t.professor_id;


--
-- FUNCTIONS
--

CREATE FUNCTION fn_preenche_data_atualizado() RETURNS TRIGGER AS $fn_preenche_data_atualizado$
    BEGIN
        NEW.atualizado_em = now();
        RETURN new;
    END;
$fn_preenche_data_atualizado$ language plpgsql;



--
-- TRIGGERS
--

CREATE trigger tr_atualiza_disciplina BEFORE UPDATE ON disciplina
    FOR EACH ROW execute procedure fn_preenche_data_atualizado();


CREATE trigger tr_atualiza_usuario BEFORE UPDATE ON usuario
    FOR EACH ROW execute procedure fn_preenche_data_atualizado();



--
-- USER PRIVILEGES
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO ekrumsedfcjcib;
GRANT ALL ON SCHEMA public TO PUBLIC;

GRANT ALL ON LANGUAGE plpgsql TO ekrumsedfcjcib;


--
-- END PostgreSQL database configuration 
--
