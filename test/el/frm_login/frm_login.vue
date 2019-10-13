<script lang="ts" src="./frm_login.ts"></script>

<template>

<div class="container">
    <div v-if="!status.user_id && !status.token" class="card">
        <div class="card-header">
            Вход пользователя:
        </div>
        <div class="card-body">
            <form>
                <label>Логин</label>
                <input
                    @input="fInputLogin"
                    class="form-control"
                    placeholder="Логин"
                >
                <label>Пароль</label>
                <input
                    @input="fInputPswd"
                    class="form-control"
                    placeholder="Пароль"
                >
            </form>
        </div>
        <div class="card-footer">
            <button @click="fLogin()" type="button" class="btn btn-primary">Вход</button>
        </div>
    </div>
    <div v-else>
        <div class="card-header">
            Добро пожаловать:
        </div>
        <div class="card-body">
            <div>ID: {{one.user.user_id}}</div>
            <div>Логин: {{one.user.login}}</div>
            <div>Имя: {{one.user.name}}</div>
        </div>
        <div class="card-footer">
            <button @click="fLogout()" type="button" class="btn btn-primary">Выход</button>
        </div>
    </div>
</div>
</template>