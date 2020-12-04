--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4 (Ubuntu 12.4-1.pgdg16.04+1)
-- Dumped by pg_dump version 12.5

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

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: usuario_tipo_enum; Type: TYPE; Schema: public; Owner: ekrumsedfcjcib
--

CREATE TYPE public.usuario_tipo_enum AS ENUM (
    'admin',
    'professor',
    'aluno',
    'nenhum'
);


ALTER TYPE public.usuario_tipo_enum OWNER TO ekrumsedfcjcib;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: aula; Type: TABLE; Schema: public; Owner: ekrumsedfcjcib
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

--
-- Name: chamada; Type: TABLE; Schema: public; Owner: ekrumsedfcjcib
--

CREATE TABLE public.chamada (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    aula_id uuid,
    carencia integer NOT NULL,
    criado_em timestamp without time zone DEFAULT now() NOT NULL,
    atualizado_em timestamp without time zone DEFAULT now() NOT NULL,
    excluido_em timestamp without time zone
);


ALTER TABLE public.chamada OWNER TO ekrumsedfcjcib;

--
-- Name: disciplina; Type: TABLE; Schema: public; Owner: ekrumsedfcjcib
--

CREATE TABLE public.disciplina (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    codigo character varying NOT NULL,
    nome character varying NOT NULL,
    criado_em timestamp without time zone DEFAULT now() NOT NULL,
    atualizado_em timestamp without time zone DEFAULT now() NOT NULL,
    excluido_em timestamp without time zone
);


ALTER TABLE public.disciplina OWNER TO ekrumsedfcjcib;

--
-- Name: presenca; Type: TABLE; Schema: public; Owner: ekrumsedfcjcib
--

CREATE TABLE public.presenca (
    chamada_id uuid NOT NULL,
    aluno_id uuid NOT NULL,
    data timestamp without time zone NOT NULL
);


ALTER TABLE public.presenca OWNER TO ekrumsedfcjcib;

--
-- Name: turma; Type: TABLE; Schema: public; Owner: ekrumsedfcjcib
--

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

--
-- Name: turma_alunos; Type: TABLE; Schema: public; Owner: ekrumsedfcjcib
--

CREATE TABLE public.turma_alunos (
    turma_id uuid NOT NULL,
    aluno_id uuid NOT NULL
);


ALTER TABLE public.turma_alunos OWNER TO ekrumsedfcjcib;

--
-- Name: users; Type: TABLE; Schema: public; Owner: ekrumsedfcjcib
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email text NOT NULL,
    salt character varying(20) NOT NULL,
    hash character varying(1024) NOT NULL
);


ALTER TABLE public.users OWNER TO ekrumsedfcjcib;

--
-- Name: usuario; Type: TABLE; Schema: public; Owner: ekrumsedfcjcib
--

CREATE TABLE public.usuario (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nome character varying NOT NULL,
    email character varying NOT NULL,
    senha character varying NOT NULL,
    tipo public.usuario_tipo_enum DEFAULT 'nenhum'::public.usuario_tipo_enum NOT NULL,
    criado_em timestamp without time zone DEFAULT now() NOT NULL,
    atualizado_em timestamp without time zone DEFAULT now() NOT NULL,
    excluido_em timestamp without time zone
);


ALTER TABLE public.usuario OWNER TO ekrumsedfcjcib;

--
-- Name: disciplina PK_disciplina; Type: CONSTRAINT; Schema: public; Owner: ekrumsedfcjcib
--

ALTER TABLE ONLY public.disciplina
    ADD CONSTRAINT "PK_disciplina" PRIMARY KEY (id);


--
-- Name: presenca PK_presenca; Type: CONSTRAINT; Schema: public; Owner: ekrumsedfcjcib
--

ALTER TABLE ONLY public.presenca
    ADD CONSTRAINT "PK_presenca" PRIMARY KEY (chamada_id, aluno_id);


--
-- Name: turma_alunos PK_turma_alunos; Type: CONSTRAINT; Schema: public; Owner: ekrumsedfcjcib
--

ALTER TABLE ONLY public.turma_alunos
    ADD CONSTRAINT "PK_turma_alunos" PRIMARY KEY (turma_id, aluno_id);


--
-- Name: usuario PK_usuario; Type: CONSTRAINT; Schema: public; Owner: ekrumsedfcjcib
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "PK_usuario" PRIMARY KEY (id);


--
-- Name: turma PK_turma; Type: CONSTRAINT; Schema: public; Owner: ekrumsedfcjcib
--

ALTER TABLE ONLY public.turma
    ADD CONSTRAINT "PK_turma" PRIMARY KEY (id);


--
-- Name: chamada PK_chamada; Type: CONSTRAINT; Schema: public; Owner: ekrumsedfcjcib
--

ALTER TABLE ONLY public.chamada
    ADD CONSTRAINT "PK_chamada" PRIMARY KEY (id);


--
-- Name: aula PK_aula; Type: CONSTRAINT; Schema: public; Owner: ekrumsedfcjcib
--

ALTER TABLE ONLY public.aula
    ADD CONSTRAINT "PK_aula" PRIMARY KEY (id);


--
-- Name: usuario UQ_usuario_email; Type: CONSTRAINT; Schema: public; Owner: ekrumsedfcjcib
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "UQ_usuario_email" UNIQUE (email);

ALTER TABLE ONLY public.disciplina
    ADD CONSTRAINT "UQ_disciplina_codigo" UNIQUE (codigo);

--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: ekrumsedfcjcib
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: ekrumsedfcjcib
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: IDX_79ab8e71b54cd395891ff607dd; Type: INDEX; Schema: public; Owner: ekrumsedfcjcib
--

CREATE INDEX "IDX_turma_alunos_turma_id" ON public.turma_alunos USING btree (turma_id);


--
-- Name: IDX_93e5c198a6ee118e43ca6b93be; Type: INDEX; Schema: public; Owner: ekrumsedfcjcib
--

CREATE INDEX "IDX_turma_alunos_aluno_id" ON public.turma_alunos USING btree (aluno_id);


--
-- Name: turma FK_046e54fc87131b5c112e4db7889; Type: FK CONSTRAINT; Schema: public; Owner: ekrumsedfcjcib
--

ALTER TABLE ONLY public.turma
    ADD CONSTRAINT "FK_046e54fc87131b5c112e4db7889" FOREIGN KEY (disciplina_id) REFERENCES public.disciplina(id);


--
-- Name: turma FK_0fc28414637572e39e3d2d6f083; Type: FK CONSTRAINT; Schema: public; Owner: ekrumsedfcjcib
--

ALTER TABLE ONLY public.turma
    ADD CONSTRAINT "FK_0fc28414637572e39e3d2d6f083" FOREIGN KEY (professor_id) REFERENCES public.usuario(id);


--
-- Name: chamada FK_5a8b2ac62497555d162224e0a20; Type: FK CONSTRAINT; Schema: public; Owner: ekrumsedfcjcib
--

ALTER TABLE ONLY public.chamada
    ADD CONSTRAINT "FK_5a8b2ac62497555d162224e0a20" FOREIGN KEY (aula_id) REFERENCES public.aula(id);


--
-- Name: turma_alunos FK_79ab8e71b54cd395891ff607dd8; Type: FK CONSTRAINT; Schema: public; Owner: ekrumsedfcjcib
--

ALTER TABLE ONLY public.turma_alunos
    ADD CONSTRAINT "FK_79ab8e71b54cd395891ff607dd8" FOREIGN KEY (turma_id) REFERENCES public.turma(id) ON DELETE CASCADE;


--
-- Name: turma_alunos FK_93e5c198a6ee118e43ca6b93bea; Type: FK CONSTRAINT; Schema: public; Owner: ekrumsedfcjcib
--

ALTER TABLE ONLY public.turma_alunos
    ADD CONSTRAINT "FK_93e5c198a6ee118e43ca6b93bea" FOREIGN KEY (aluno_id) REFERENCES public.usuario(id) ON DELETE CASCADE;


--
-- Name: aula FK_9be5f2ae728b9b2b97363c38a80; Type: FK CONSTRAINT; Schema: public; Owner: ekrumsedfcjcib
--

ALTER TABLE ONLY public.aula
    ADD CONSTRAINT "FK_9be5f2ae728b9b2b97363c38a80" FOREIGN KEY (turma_id) REFERENCES public.turma(id);


--
-- Name: presenca FK_b366ab1b8b2c5805f18320c9e8d; Type: FK CONSTRAINT; Schema: public; Owner: ekrumsedfcjcib
--

ALTER TABLE ONLY public.presenca
    ADD CONSTRAINT "FK_b366ab1b8b2c5805f18320c9e8d" FOREIGN KEY (chamada_id) REFERENCES public.chamada(id);


--
-- Name: presenca FK_ca6d55f15d0a6508bb9bd933645; Type: FK CONSTRAINT; Schema: public; Owner: ekrumsedfcjcib
--

ALTER TABLE ONLY public.presenca
    ADD CONSTRAINT "FK_ca6d55f15d0a6508bb9bd933645" FOREIGN KEY (aluno_id) REFERENCES public.usuario(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: ekrumsedfcjcib
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO ekrumsedfcjcib;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO ekrumsedfcjcib;


--
-- PostgreSQL database dump complete
--

