<template>
  <LoginForm @go-to-signup="$router.push('/signup')" />
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
  components: { LoginForm }
}
</script>
