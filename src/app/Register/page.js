
export default function RegisterPage() {
    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
            <form>
                <input type="email" placeholder="email"/>
                <input type="password" placeholder="password"/>
                <button type="submit">Register</button>
                <div className="my-4 text-center text-gray-500">
                    or login with provider

                </div>
                <button>Login with Google</button>
            </form>
            
        </section>
    )
}
