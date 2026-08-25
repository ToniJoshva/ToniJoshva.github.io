from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/skills')
def skills():
    return render_template('skills.html')

@app.route('/search')
def search():
    return render_template('search.html')

@app.route('/requests')
def requests():
    return render_template('requests.html')

@app.route('/reviews')
def reviews():
    return render_template('reviews.html')

if __name__ == "__main__":
    app.run(debug=True)